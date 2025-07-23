import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    // Get the secret token from the request
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    // Check if the secret is valid
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid revalidation token" }, { status: 401 })
    }

    // Get the path to revalidate from the request body
    const { path } = await request.json()

    if (!path) {
      return NextResponse.json({ message: "Path is required" }, { status: 400 })
    }
    if (path === "all") {
      // If no path is provided, revalidate the root layout which affects all routes
      // Invalidate all routes
      revalidatePath("/", "layout")
    } else {
      // Revalidate the path
      revalidatePath(path)
    }

    return NextResponse.json({
      revalidated: true,
      message: `Path: ${path} revalidated successfully`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json(
      {
        revalidated: false,
        message: "Error revalidating path",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
