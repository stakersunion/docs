import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Textarea } from 'components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form'
import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email(),
  message: z.string(),
})

const Contact = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      message: '',
    },
  })

  const onSubmit = async (data) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <Form {...form}>
      {form.formState.isSubmitSuccessful && (
        <Alert
          variant={'success'}
          className={'my-6'}
        >
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your message has been sent.</AlertDescription>
        </Alert>
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={'space-y-2'}
      >
        <FormField
          control={form.control}
          name={'email'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder={'email@example.com'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'message'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={'Your message here'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type={'submit'}>
          {form.formState.isSubmitting && (
            <Loader2
              size={16}
              className={'mr-2 h-4 w-4 animate-spin'}
            />
          )}
          Submit
        </Button>
      </form>
    </Form>
  )
}
export default Contact
