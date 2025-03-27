"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export function EmailSignInForm() {
  const form = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });


  return (
    <Form {...form}>
      <form
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button >
            Войти через Email
          </Button>
        </div>
      </form>
    </Form>
  );
}