"use client";
// import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button"


export function Hero() {
    return (
    <section className="lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
            >
                <h2 className="mb-4 text-2xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
                    {/* <span className="text-transparent bg-gradient-to-r from-purple-500 via-green-400 to-purple-400 bg-clip-text inline-block">
                        Hello, I&apos;m{" "}
                    </span> */}
                    <span>
                        Hello, I&apos;m{" "}
                    </span>
                    <br></br>
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
                <p className="text-primary sm:text-lg mb-6 lg:text-xl">
                    I know I am asking for a lot, but feel free to connect with me on LinkedIn!
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                    <Button>Hire Me</Button>
                    <Button variant="secondary">Download CV</Button>
                    <Link href="https://github.com/miken515" target="_blank">
                        <Image
                        src="/icons/github-icon.svg"
                        width={50}
                        height={50}
                        priority={false} 
                        alt="Github Icon"
                        className="invert dark:invert-0"
                        />
                    </Link>
                    <Link href="https://linkedin.com/in/miken515" target="_blank">
                        <Image
                        src="/icons/linkedin-icon.svg"
                        width={50}
                        height={50}
                        alt="Linkedin Icon"
                        className="invert dark:invert-0"
                        />
                    </Link>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-4 place-self-center mt-4 lg:mt-0"
            >
                <div className="rounded-full bg-orange-400 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative flex items-center justify-center">
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