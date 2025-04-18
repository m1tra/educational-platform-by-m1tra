"use client"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../ui/form"

export function EmailSignInForm() {
  const form = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  })

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
                  <input
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled
                    className="w-full bg-transparent border border-white/30 px-3 py-2 text-sm font-mono placeholder:text-white/40 focus:outline-none focus:border-white disabled:opacity-50"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <button
            disabled
            className="border border-white/30 px-4 py-2 font-mono text-sm text-white/70 disabled:opacity-50"
          >
            ВОЙТИ ЧЕРЕЗ EMAIL
          </button>
        </div>
      </form>
    </Form>
  )
}
