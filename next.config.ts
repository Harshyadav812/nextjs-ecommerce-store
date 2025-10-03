import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const path = require('path')

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['127.0.0.1'],

  turbopack: {
    root: path.join(__dirname, '..'),
  },

  // experimental: {
  //   reactCompiler: true,
  // },
}

export default withPayload(nextConfig)
