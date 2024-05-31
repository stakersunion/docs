import { useEffect } from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Textarea } from 'components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select'
import { Checkbox } from 'components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from 'components/ui/form'
import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert'
import { Separator } from 'components/ui/separator'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { isAddress } from 'ethers'

const addressTypes = ['Withdrawal', 'Deposit', 'Fee Recipient']
const lists = ['GLCNI/StakeCat List A', 'Rated']
const stakingMethods = [
  'Home',
  'RocketPool',
  'AllNodes',
  'Blox (SSV)',
  'Stakefish',
  'Abyss',
  'Sensei',
  'ChainLabo',
  'Squid',
  'Other',
]
const defaultValues = {
  email: '',
  ethAddress: '',
  addressType: '',
  lists: '',
  stakingMethod: '',
  otherStakingMethod: '',
  rationale: '',
}

const schema = z.object({
  email: z.union([z.literal(''), z.string().email()]),
  ethAddress: z.string().refine((value) => isAddress(value), {
    message: 'The provided ETH address is invalid.',
  }),
  addressType: z.enum(addressTypes, {
    errorMap: () => ({ message: 'Required' }),
  }),
  lists: z.array(z.enum(lists)).nonempty({
    message: 'At least one list must be selected.',
  }),
  stakingMethod: z.enum(stakingMethods, {
    errorMap: () => ({ message: 'Required' }),
  }),
  otherStakingMethod: z.string().optional(),
  rationale: z.string(),
})

const Appeal = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const onSubmit = async (data) => {
    if (data.otherStakingMethod) {
      data.stakingMethod = data.otherStakingMethod
    }
    data.lists = data.lists.join(', ')

    try {
      await fetch('/api/appeal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset(defaultValues, { keepIsSubmitted: true })
    }
  }, [form.formState, form.reset])

  const stakingMethod = form.watch('stakingMethod')

  return (
    <Form {...form}>
      {form.formState.isSubmitted && (
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
              <FormDescription>
                Only enter an email address if you would like to receive updates regarding your
                appeal.
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'ethAddress'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ETH Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'addressType'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={'Select address type'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {addressTypes.map((type) => (
                    <SelectItem
                      key={type}
                      value={type}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'lists'}
          render={() => (
            <FormItem>
              <div className={'mb-4'}>
                <FormLabel>Lists</FormLabel>
                <FormDescription>Select which lists your address is missing from</FormDescription>
              </div>
              {lists.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name={'lists'}
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className={'flex flex-row items-start space-x-3 space-y-0'}
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item])
                                : field.onChange(field.value?.filter((value) => value !== item))
                            }}
                          />
                        </FormControl>
                        <FormLabel className={'font-normal'}>{item}</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'stakingMethod'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staking Method</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={'Select staking method'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stakingMethods.map((method) => (
                    <SelectItem
                      key={method}
                      value={method}
                    >
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {stakingMethod === 'Other' && (
          <FormField
            control={form.control}
            name={'otherStakingMethod'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Staking Method</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name={'rationale'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rationale</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className={'bg-transparent'} />
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
export default Appeal
