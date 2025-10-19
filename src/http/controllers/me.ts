import { prisma } from '@/lib/prisma.js'
import type { Request, Response } from 'express'


export async function me(req: Request, res: Response) {
  const userId = req.userId!
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, createdAt: true },
  })
  if (!user) return res.status(404).json({ message: 'User not found' })
  return res.json({ user })
}
