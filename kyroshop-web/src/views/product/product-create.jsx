import { cn } from '../../helpers/cn.js'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useGetCategory,
} from '../../api-hooks/use-category.api.js'
import { toast } from 'sonner'
import { show_form_error_message } from '../../helpers/error_message.js'
import { useNavigate } from 'react-router'
import { useCreateProduct } from '../../api-hooks/use-product.api.js'
import ProductForm from './product-form.jsx'

function ProductCreate() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return (
    <>
      <div className={cn("flex")}>
        <h1 className={cn('text-lg font-bold mb-4')}>Product</h1>
      </div>
      <ProductForm />
    </>
  )
}

export default ProductCreate