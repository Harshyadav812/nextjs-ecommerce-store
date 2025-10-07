'use client'

import z from "zod"
import Link from "next/link"
import { Poppins } from "next/font/google"
import { useForm } from "react-hook-form"
import { loginSchema } from "../../schemas"
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useTRPC } from "@/trpc/client"
import { useRouter } from "next/navigation"


interface Props {
  redirectTo?: string
}


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

export const SingInView = ({ redirectTo }: Props) => {
  const router = useRouter()

  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const login = useMutation(trpc.auth.login.mutationOptions({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
      router.push("/")
    }
  }))

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSumbit = (values: z.infer<typeof loginSchema>) => {
    try {
      login.mutate(values)
      toast.success('Login Successful')
      router.push(redirectTo || '/')
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumbit)}
            className="flex flex-col gap-8 p-4 lg:p-16">
            <div className="flex items-center justify-between mb-8">
              <Link href={"/"}>
                <span className={cn("text-2xl font-semibold  ", poppins.className)}>
                  Shopsy
                </span>
              </Link>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-base border-none underline"
              >
                <Link
                  prefetch
                  href={"/sign-up"}>
                  Sign Up
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Welcome back to Shopsy
            </h1>

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={login.isPending}
              type="submit"
              size={"lg"}
              variant={"hoverElevated"}
              className="bg-black text-white hover:bg-blue-400 hover:text-primary"
            >
              Log In
            </Button>
          </form>
        </Form>
      </div>
      <div className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>

      </div>
    </div>
  )
}