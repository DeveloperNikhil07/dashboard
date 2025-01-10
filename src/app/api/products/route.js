import { NextResponse } from "next/server";
import { connectionStr } from "../../lib/db";
import mongoose from "mongoose";
import { Product } from "../../lib/model/product";

export async function GET() {
    const data = await Product.find();
    await mongoose.connect(connectionStr);
    return NextResponse.json({ result:true});
}
