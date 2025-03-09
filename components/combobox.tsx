"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

export interface ITasks{
  value:string,
  label:string
}
interface ICombobox{
  onSelect: (option: ITasks) => void;
}

export const Combobox = ({ onSelect }:ICombobox) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedOption, setSelectedOption] = useState("пропущенные слова")
  const [filteredOptions, setFilteredOptions] = useState<ITasks[]>([])

  const options:ITasks[] = [ { value: "words", label: "пропущенные слова", }, { value: "definition", label: "слово - определение", }, { value: "code", label: "код", } ]
  useEffect(() => {
    const filtered = options.filter((option:ITasks) => option.label.toLowerCase().includes(search.toLowerCase()))
    setFilteredOptions(filtered)
  }, [search])

  const handleSelect = (option:ITasks) => {
    setSelectedOption(option.label)
    setOpen(false)
    if (onSelect) {
      onSelect(option)
    }
  }

  return (
      <motion.div animate={open ? "open" : "closed"} className="relative w-48 z-20">
        <Button
          onClick={() => setOpen((pv) => !pv)}
          variant={"outline"}
          className="flex items-center gap-2 px-3 py-2 rounded-md  transition-colors"
        >
          <span className="font-medium text-sm">{selectedOption || "Select an option"}</span>
          <motion.span variants={iconVariants}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.span>
        </Button>

        <motion.div
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-background  absolute top-[120%] left-[50%] w-48 overflow-hidden border-[1px]"
        >
          <div className="px-1 py-1">
            <Input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className={cn("py-0 h-6 border-none focus-visible:ring-0")}
            />
          </div>

          <ul className="max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option:ITasks) => (
                <Option key={option.value} text={option.label} onSelect={() => handleSelect(option)} />
              ))
            ) : (
              <li className="px-2 py-1 text-xs text-gray-500">No results found</li>
            )}
          </ul>
        </motion.div>
      </motion.div>
  )
}

interface IOption{
  text:string,
  onSelect: () => void;
}

const Option = ({ text, onSelect }:IOption) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={onSelect}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
    >
      <span>{text}</span>
    </motion.li>
  )
}

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
}

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
}

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
}

