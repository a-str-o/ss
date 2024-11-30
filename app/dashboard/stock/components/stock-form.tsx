"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DialogFooter } from "@/components/ui/dialog"
import { useLanguage, useTranslation } from "@/app/contexts/LanguageContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const stockTypes = [
  { value: "raw_materials", label: "Raw Materials" },
  { value: "wip", label: "Work in Progress (WIP)" },
  { value: "finished_goods", label: "Finished Goods" },
  { value: "packaging", label: "Packaging Materials" },
  { value: "spare_parts", label: "Spare Parts" },
  { value: "maintenance", label: "Maintenance Items" },
  { value: "office_supplies", label: "Office Supplies" },
  { value: "safety_stock", label: "Safety Stock" },
  { value: "buffer_stock", label: "Buffer Stock" },
  { value: "seasonal_stock", label: "Seasonal Stock" },
  { value: "transit_stock", label: "Transit Stock" },
  { value: "consignment_stock", label: "Consignment Stock" },
  { value: "cycle_stock", label: "Cycle Stock" },
  { value: "promotional", label: "Promotional Items" },
  { value: "quality_control", label: "Quality Control Samples" },
  { value: "returns_damaged", label: "Returns/Damaged Goods" },
  { value: "obsolete", label: "Obsolete Stock" },
  { value: "bulk_storage", label: "Bulk Storage" },
  { value: "cold_storage", label: "Cold Storage" },
  { value: "hazardous", label: "Hazardous Materials" },
] as const

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string({
    required_error: "Please select a stock type.",
  }),
  volumeSize: z.coerce.number().min(0, {
    message: "Volume size must be a positive number.",
  }),
  sizeLimit: z.coerce.number().min(0, {
    message: "Size limit must be a positive number.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
})

type FormData = z.infer<typeof formSchema>

interface StockFormProps {
  initialData?: FormData
  onSubmit: (data: FormData) => void
  onCancel?: () => void
}

export default function StockForm({ initialData, onSubmit, onCancel }: StockFormProps) {
  const { language } = useLanguage()
  const t = useTranslation()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      type: "",
      volumeSize: 0,
      sizeLimit: 0,
      address: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t?.name || "Name"}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter stock location name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t?.type || "Type"}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stock type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stockTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="volumeSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t?.volumeSize || "Volume Size"}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sizeLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t?.sizeLimit || "Size Limit"}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t?.address || "Address"}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter stock location address" />
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
