import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function Contact() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5">
            <div className="flex flex-col justify-center content-center">
                <h5 className="text-xl font-bold my-2 uppercase">Let&apos;s Connect!</h5>
                <p className="text-[#ADB7BE] mb-4 max-w-md">
                I&apos;m currently looking for new opportunities, my inbox is always
                open. Whether you have a question or just want to say hi, I&apos;ll
                try my best to get back to you!
                </p>
            </div>

            <div className="w-full">
                <h5 className="text-xl font-bold my-2 uppercase text-center">Contact</h5>
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