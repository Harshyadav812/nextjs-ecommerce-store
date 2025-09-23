import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['127.0.0.1'],
}

export default withPayload(nextConfig)
