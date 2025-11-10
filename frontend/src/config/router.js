/**
 * Router configuration
 * 
 * This file contains the router base path configuration.
 * You can set the router base path by setting the PROXY_PREFIX_PATH environment variable.
 * 
 * Examples:
 * - PROXY_PREFIX_PATH=/easy-mcp/  (with prefix /easy-mcp/)
 * - PROXY_PREFIX_PATH=            (empty, no prefix, default - uses '/')
 * - PROXY_PREFIX_PATH=/app/       (with prefix /app/)
 * 
 * Note: When PROXY_PREFIX_PATH is empty or not set, it defaults to '/' which means no prefix.
 * Both '' and '/' are treated as root path (no prefix) in Vue Router.
 */

// Get router base from environment variable, default to empty string
export const basePath = import.meta.env.PROXY_PREFIX_PATH || ''

/**
 * Normalize the router base path
 * - Ensures it starts with '/' if not empty
 * - Ensures it ends with '/' if not empty  
 * - Returns '/' if the value is empty (default, no prefix)
 * 
 * Note: Vue Router treats both '' and '/' as root path (no prefix).
 * We return '/' for consistency with Vite's base configuration.
 * When the value is '/', all routes will work without any prefix.
 */
export function normalizeRouterBase(base) {
  // If empty or just '/', return '/' (root path, no prefix)
  if (!base || base.trim() === '' || base === '/') {
    return '/'
  }
  
  // Remove leading and trailing slashes, then add them back properly
  const normalized = base.trim().replace(/^\/+|\/+$/g, '')
  
  // If after normalization it's empty, return '/'
  if (!normalized) {
    return '/'
  }
  
  // Return normalized path with leading and trailing slashes
  return `/${normalized}/`
}

// Export normalized router base
export const ROUTER_BASE = normalizeRouterBase(basePath)

/**
 * Normalize the API request prefix.
 * - Ensures it starts with '/' if not empty
 * - Removes trailing '/' to make joining paths easier
 * - Returns '' if the value is empty (default, no prefix)
 */
export function normalizeRequestPrefix(base) {
  if (!base || base.trim() === '' || base === '/') {
    return ''
  }

  const normalized = base.trim().replace(/^\/+|\/+$/g, '')

  if (!normalized) {
    return ''
  }

  return `/${normalized}`
}

// Export normalized API request prefix
export const API_REQUEST_PREFIX = normalizeRequestPrefix(basePath)

