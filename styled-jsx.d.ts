import 'react'

// styled-jsx: habilita <style jsx> / <style jsx global> en TSX.
declare module 'react' {
  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    jsx?: boolean
    global?: boolean
  }
}
