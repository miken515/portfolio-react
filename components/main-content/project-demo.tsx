import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export function ProjectDemo() {
    return (
        <section id="demo">
            <h1 className="text-4xl font-bold mb-4 uppercase">Project Demos</h1>
            <div className="grid grid-cols-1 p-12">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    Project Image Goes Here...
                                </div>
                                <div>
                                    Project Details Go here...
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            
        </section>

    )
};