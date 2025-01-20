import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";

export function Contact() {
    return (
        <section className="container grid grid-cols-2 gap-4 px-5">
            <div className="justify-center content-center">
            <h5 className="text-xl font-bold my-2 uppercase">
                Let&apos;s Connect!
            </h5>
            <p className="text-[#ADB7BE] mb-4 max-w-md">
                {" "}
                I&apos;m currently looking for new opportunities, my inbox is always
                open. Whether you have a question or just want to say hi, I&apos;ll
                try my best to get back to you!
            </p>
            {/* <div className="socials flex flex-row gap-2">
                <Link href="github.com">
                <Image src={GithubIcon} alt="Github Icon" />
                </Link>
                <Link href="linkedin.com">
                <Image src={LinkedinIcon} alt="Linkedin Icon" />
                </Link>
            </div> */}
            </div>
        <div className="w-100">
            <h5 className="text-xl font-bold my-2 uppercase text-center">
                Contact
            </h5>
            <form>
                <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="ex. john.doe@example.com" className="w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="ex. Doe" className="w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="message">Message</Label>
                    <Input id="message" type="text" placeholder="ex. john.doe@example.com" className="w-full" />
                    </div>
                </div>
                </div>
            </form>
            </div>
    </section>
    )
}