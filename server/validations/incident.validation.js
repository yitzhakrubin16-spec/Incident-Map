import { z } from "zod"

export const createIncidentSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),

    category: z.enum([
        "fire",
        "flood",
        "accident",
        "medical",
        "other"
    ]),

    location: z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180)
    })
})

export const updateIncidentSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),

    category: z.enum([
        "fire",
        "flood",
        "accident",
        "medical",
        "other"
    ]).optional(),

    status: z.enum([
        "open",
        "in_progress",
        "closed"
    ]).optional(),

    location: z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180)
    }).optional()
})

export const incidentIdSchema = z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    "Invalid incident id"
)

export const categoryQuerySchema = z.enum([
    "fire",
    "flood",
    "accident",
    "medical",
    "other"
]).optional()