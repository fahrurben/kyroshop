import { cn } from '../../helpers/cn.js'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useGetCategory, useGetCategoryById,
} from '../../api-hooks/use-category.api.js'
import { toast } from 'sonner'
import { show_form_error_message } from '../../helpers/error_message.js'
import { useNavigate, useParams } from 'react-router'
import {
  useGetProductById,
} from '../../api-hooks/use-product.api.js'
import ProductForm from './product-form.jsx'
import { useEffect } from 'react'

function ProductEdit() {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: {data: product } = {}, refetch: refetchProduct } = useGetProductById(id)

  useEffect(() => {
    refetchProduct()
  }, [])

  return (
    <>
      <div className={cn("flex")}>
        <h1 className={cn('text-lg font-bold mb-4')}>Product</h1>
      </div>
      <ProductForm id={id} initialData={{...product}} />
    </>
  )
}

export default ProductEdit