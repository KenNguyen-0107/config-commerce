"use client"
import NavControl from "@/components/layout/header/NavPrimary/NavControl"
import Icon from "@/components/shared/icons"
import useClickOutside from "@/hook/useClickOutside"
import { useRouter } from "next/navigation"
import React, { MouseEvent, RefObject, useCallback, useEffect, useRef, useState, useTransition } from "react"
import { ProductProps } from "../Product/types"
import { SearchByKeyword } from "./actions"
import SuggestionList from "./SuggestionList"
import { HeaderSearchInputProps, REQUIRED_LENGTH } from "./types"
import useDebounce from "@/hook/useDebounce"


const HeaderSearch: React.FC<HeaderSearchInputProps> = ({Section}) => {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [keyword, setKeyword] = useState<string>("")
  const [suggestions, setSuggestions] = useState<ProductProps[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition();

  const debouncedSearchInput = useDebounce(keyword, 300)

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus()
    }
  }, [isExpanded])

  useClickOutside(containerRef as RefObject<HTMLElement>, () => {
    setIsExpanded(false)
    setSuggestions([])
  })

  const handleSearchSubmit = useCallback(() => {
    if (keyword.trim()) {
      router.push(`/search?query=${encodeURIComponent(keyword)}`)
    }
  }, [keyword, router])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyword.length < REQUIRED_LENGTH) return setSuggestions([])

    if (e.key === "Enter") {
      return handleSearchSubmit()
    }
  }

  const handleOnInputChange = (e: string) => {
    setKeyword(e)
    if (e.length < 2) {
      setSuggestions([])
    }
  }

  const handleSuggestionSelect = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    router.push(e.currentTarget.href)
    setKeyword("")
    setIsExpanded(false)
    setSuggestions([])
  }

  const handleSearchInput = (keyword: string) => {
    startTransition(async () => {
      const result = await SearchByKeyword(keyword)
      // if (result === undefined) 
      setSuggestions(result as ProductProps[])
    })
  }

  useEffect(() => {
    if (debouncedSearchInput.length < REQUIRED_LENGTH) return setSuggestions([])

    handleSearchInput(debouncedSearchInput)
  }, [debouncedSearchInput])

  if (!Section) return null

  if (!isExpanded) {
    return (
      <>
      <NavControl />

      <div className="absolute z-50 flex justify-center items-center bg-transparent right-4 top-0 h-full">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex-shrink-0 text-white transition-colors"
          aria-label="Open Search"
          title="Open Search"
        >
          <Icon iconName="search" size={40} viewSize={40} className="fill-blue" />
        </button>
      </div>
      </>
    )
  }

  return (
    <>
    <NavControl />
    <div ref={containerRef} className="absolute z-50 flex flex-col justify-center items-center bg-transparent right-4 top-1/2 -translate-y-1/2 w-[350px]">
      <div
        className="w-full flex"
      >
        <div className="relative w-full flex-grow">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="block w-full px-4 py-2 border border-gray-300 focus:outline-none"
            value={keyword}
            onChange={(e) => handleOnInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={(e) => handleOnInputChange(e.target.value)}
          />

          {isPending && (
            <div role="status" className="absolute top-1/2 right-3 -translate-y-1/2">
              <Icon iconName="spinner" viewSize={100} className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue" />
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>

        <button
          onClick={handleSearchSubmit}
          className="flex-shrink-0 bg-cta-primary-bg text-white transition-colors"
          aria-label="Search"
        >
          <Icon iconName="search" size={40} viewSize={40} className="fill-white" />
        </button>
      </div>

      {isExpanded && !!keyword && (
        <SuggestionList
          keyword={keyword}
          suggestions={suggestions}
          onSelect={handleSuggestionSelect}
          isPending={isPending}
        />
      )}
    </div>
    </>
  )
}

export default HeaderSearch
