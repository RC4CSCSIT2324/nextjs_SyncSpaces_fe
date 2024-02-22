import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  nusnet: z.string().regex(/^[eE]\d{7}$/),
  tele: z.string(),
  email: z.string().email().endsWith('@u.nus.edu', {
      message: 'Please use NUS email'
  }),
  password: z.string(),
})

export default schema
