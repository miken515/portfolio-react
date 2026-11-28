"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { profile } from "@/lib/resume";
import { Reveal } from "./section-heading";

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
    <section id="contact" className="grid scroll-mt-28 grid-cols-1 gap-8 py-16 md:grid-cols-2">
      <Reveal className="paper flex flex-col justify-center p-6 sm:p-8">
        <p className="mb-1 font-hand text-base text-primary">Say hello</p>
        <h2 className="my-2 text-4xl font-black">
          <span className="brush">Let&apos;s Connect!</span>
        </h2>
        <p className="mb-4 max-w-md text-muted-foreground sm:text-lg">
          Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you! You can also email me at{" "}
          <a href={`mailto:${profile.email}`} className="font-medium text-foreground underline underline-offset-4">
            {profile.email}
          </a>
          .
        </p>
        <div className="flex items-center justify-center sm:justify-start gap-3 -mx-2">
          <Link href={profile.github} target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/github-icon.svg"
              width={50}
              height={50}
              priority={false}
              alt="Github Icon"
              className="invert dark:invert-0"
            />
          </Link>
          <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/linkedin-icon.svg"
              width={50}
              height={50}
              alt="Linkedin Icon"
              className="invert dark:invert-0"
            />
          </Link>
        </div>
      </Reveal>

      <Reveal className="paper w-full p-6 sm:p-8" delay={0.1}>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required
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
                required
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
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here."
                className="w-full"
              />
            </div>

            <Button className="mt-4 rounded-full" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send a message"}
            </Button>
          </div>
        </form>
        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </Reveal>
    </section>
  );
}