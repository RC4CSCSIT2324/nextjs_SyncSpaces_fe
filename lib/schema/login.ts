import { z } from 'zod'

const schema = z.object({
    email: z.string().email().endsWith('@u.nus.edu', {
        message: 'Please use NUS email'
    }),
    password: z.string(),
})

export default schema
