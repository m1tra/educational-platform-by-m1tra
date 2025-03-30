import { CategoryModel } from "@/src/entities/categories/model"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url)
      const id = searchParams.get('id')
      if (id) {
        const category = await CategoryModel.getById(id)
        return NextResponse.json(category, { status: 200 })
      } else {
        const category = await CategoryModel.getAll()
        return NextResponse.json(category, { status: 200 })
      }
    } catch (error) {
      console.error('Error fetching tests:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tests' },
        { status: 500 }
      )
    }
  }
