"use client";
// import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button"


export function Hero() {
    return (
    <section className="pt-12 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-8 place-self-center text-center sm:text-left justify-self-start sm:order-1 order-2"
            >
                <h2 className="mb-4 text-2xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold mt-14">
                    <span>
                        Hello, I&apos;m{" "}
                    </span>
                    <br />
                    <TypeAnimation
                        sequence={[
                            "Mike Nguyen",
                            2000,
                            "A Software Dev",
                            2000,
                            "And...",
                            4000,
                            "A Dog Lover!",
                            1000,
                            "And Cats!",
                            1000,
                        ]}
                        wrapper="span"
                        speed={30}
                        repeat={Infinity}
                    />
                </h2>
                <p className="text-gray-600 sm:text-lg mb-6 lg:text-xl">
                    I know I am asking for a lot, but feel free to connect with me on LinkedIn!
                </p>
                {/* <div className="flex items-center justify-center mb-6 sm:mb-0 sm:justify-start gap-3">
                    <Button>Hire Me</Button>
                    <Button variant="secondary">Download CV</Button>
                </div> */}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-4 place-self-center mt-4 lg:mt-0 sm:order-2 order-1"
            >
                <div className="rounded-full w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative flex items-center justify-center">
                    <Image
                        src="/images/pfp.jpeg"
                        alt="hero image"
                        className="rounded-full"
                        width={390}
                        height={390}
                    />
                </div>
            </motion.div>
        </div>
    </section>
    )
}