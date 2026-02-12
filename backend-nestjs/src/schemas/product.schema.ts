import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema({timestamps: true})
export class Product {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    category: string;

    @Prop({required: true})
    price: number;

    @Prop({default: 0})
    stock: number;

    @Prop()
    image?: string;

    @Prop({default: 0})
    sold: number;

    createdAt: Date;
    updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);