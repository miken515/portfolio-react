import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export function Contact() {
    return (
        <section id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-4 py-12">
            <div className="flex flex-col justify-center content-center">
                <h2 className="text-4xl font-bold my-2 uppercase">Let&apos;s Connect!</h2>
                <p className="text-gray-600 mb-4 max-w-md sm:text-lg">
                    I&apos;m currently looking for new opportunities, my inbox is always
                    open. Whether you have a question or just want to say hi, I&apos;ll
                    try my best to get back to you!
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 -mx-2">
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
            </div>

            <div className="w-full">
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="ex. john.doe@example.com"
                            className="w-full"
                        />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            placeholder="ex. New Opportunity"
                            className="w-full"
                        />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="message">Message</Label>
                        <Textarea placeholder="Type your message here." className="w-full" />
                        </div>

                        <Button className="mt-4">Send a message</Button>
                    </div>
                </form>
            </div>
        </section>

    )
};