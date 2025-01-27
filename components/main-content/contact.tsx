"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log('lol', response)

      if (response.ok) {
        setSuccessMessage("Your message was sent successfully!");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ex. john.doe@example.com"
                className="w-full"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="ex. New Opportunity"
                className="w-full"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here."
                className="w-full"
              />
            </div>

            <Button className="mt-4" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send a message"}
            </Button>
          </div>
        </form>
        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </div>
    </section>
  );
}