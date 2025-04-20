"use client"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../ui/form"
import { motion } from "framer-motion"
import { useState } from "react"

export function EmailSignInForm() {
  const form = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  })

  const [isFocused, setIsFocused] = useState(false)

  return (
    <Form {...form}>
      <form>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <motion.div
                    className="relative"
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.input
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled
                      className="w-full bg-transparent border border-white/30 px-3 py-2 text-sm font-mono placeholder:text-white/40 focus:outline-none focus:border-white disabled:opacity-50 text-white"
                      onFocus={() => setIsFocused(true)}
                      {...field}
                    />

                    {isFocused && (
                      <motion.div
                        className="absolute inset-0 border border-white pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 0.5, 0],
                          x: [0, -1, 1, 0],
                        }}
                        transition={{
                          duration: 0.2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                        }}
                      />
                    )}
                  </motion.div>
                </FormControl>
              </FormItem>
            )}
          />

          <motion.button
            disabled
            className="border border-white/30 px-4 py-2 font-mono text-sm text-white/70 disabled:opacity-50 relative overflow-hidden"
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.span
              className="relative z-10"
              whileHover={{
                x: [0, -2, 2, -1, 0],
                transition: { duration: 0.3 },
              }}
            >
              ВОЙТИ ЧЕРЕЗ EMAIL
            </motion.span>

            <motion.div
              className="absolute inset-0 bg-white/5"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
          </motion.button>
        </div>
      </form>
    </Form>
  )
}
