import { db } from '@/db';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { CreateCategoryDto, Exception, toCategoryDto } from '@/api';
import { exceptionMsg } from '../exception-msg';

export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: {
        coverImage: true,
      },
      orderBy: [{ order: Prisma.SortOrder.asc }],
    });

    return NextResponse.json(categories.map(el => toCategoryDto(el)));
  } catch (e: any) {
    return NextResponse.json(new Exception(e.message || exceptionMsg.NOT_EXECUTE), { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, coverImageId } = (await req.json()) as CreateCategoryDto;
    const lastIdx = await db.category
      .aggregate({
        _max: {
          order: true,
        },
      })
      .then(res => res._max.order as number);

    const created = await db.category.create({
      data: {
        name,
        coverImageId,
        order: lastIdx + 1,
      },
    });

    const coverImage = await db.image.findFirst({ where: { id: coverImageId } });

    return NextResponse.json(toCategoryDto({ ...created, coverImage }));
  } catch (e: any) {
    return NextResponse.json(new Exception(e.message || exceptionMsg.NOT_EXECUTE), { status: 400 });
  }
}
