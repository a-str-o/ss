"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { Stock } from "@/lib/stock"

export const stockTypeSuggestions = [
  "Raw Materials",
  "Work in Progress (WIP)",
  "Finished Goods",
  "Packaging Materials",
  "Spare Parts",
  "Maintenance Items",
  "Office Supplies",
  "Safety Stock",
  "Buffer Stock",
  "Seasonal Stock",
  "Transit Stock",
  "Consignment Stock",
  "Cycle Stock",
  "Promotional Items",
  "Quality Control Samples",
  "Returns/Damaged Goods",
  "Obsolete Stock",
  "Bulk Storage",
  "Cold Storage",
  "Hazardous Materials",
]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string().min(1, {
    message: "Type is required.",
  }),
  volume_size: z.coerce.number().min(0, {
    message: "Volume size must be a positive number.",
  }),
  size_limit: z.coerce.number().min(0, {
    message: "Size limit must be a positive number.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
})

export type FormData = z.infer<typeof formSchema>

interface StockFormProps {
  initialData?: FormData
  onSubmit: (data: FormData) => void
  onCancel?: () => void
}

export default function StockForm({ initialData, onSubmit, onCancel }: StockFormProps) {
  const [typeSearchTerm, setTypeSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { t } = useLanguage()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      type: "",
      volume_size: 0,
      size_limit: 0,
      address: "",
    },
  })

  const filteredSuggestions = stockTypeSuggestions.filter((type) =>
    type.toLowerCase().includes(typeSearchTerm.toLowerCase())
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t?.name || "Name"}</FormLabel>
              <FormControl>
                <Input placeholder={t?.stockName || "Stock name"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>{t?.type || "Type"}</FormLabel>
              <FormControl>
                <div>
                  <Input
                    placeholder={t?.stockType || "Stock type"}
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      setTypeSearchTerm(e.target.value)
                      setShowSuggestions(true)
                    }}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  {showSuggestions && typeSearchTerm && (
                    <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-auto">
                      {filteredSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            field.onChange(suggestion)
                            setTypeSearchTerm(suggestion)
                            setShowSuggestions(false)
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="volume_size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t?.volumeSize || "Volume Size"}</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size_limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t?.sizeLimit || "Size Limit"}</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t?.address || "Address"}</FormLabel>
              <FormControl>
                <Input placeholder={t?.stockAddress || "Stock address"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              {t?.cancel || "Cancel"}
            </Button>
          )}
          <Button type="submit">{t?.save || "Save"}</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
