import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

const technicalSkills = [
    {
      category: "Programming Languages",
      skills: ["TypeScript", "JavaScript", "MySQL", "Python", "HTML", "CSS", "PHP"],
    },
    {
      category: "Development Tools",
      skills: ["Docker", "Git", "Figma", "Postman", "Swagger", "Jira", "VS Code"],
    },
    {
        category: "Development Practices",
        skills: ["Agile", "Scrum", "DevOps", "CI/CD", "TDD", "Code Review"],
    }
];

const technologies = [
    {
      category: "Frameworks and Libraries",
      skills: ["Angular", "React", "Node.js", "NestJS", "NextJS", "Tailwind CSS"],
    },
    {
      category: "Databases",
      skills: ["MongoDB", "MySQL", "Postgres"],
    },
    {
      category: "Cloud and DevOps",
      skills: ["Azure", "AWS", "Azure DevOps"],
    },
];

export function About() {
    return (
        <section className="py-8 sm:py-12" id="about">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Left Column: Fun Facts */}
                <div className="col-span-1 text-center sm:text-left">
                    <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                        <h2 className="text-4xl font-bold mb-4">Fun Facts!</h2>
                        <p className="text-gray-600 text-base sm:text-lg">
                        Cats cannot taste sweetness. Full-stack developer by day, bug slayer by night! 
                        When I&apos;m not architecting Docker solutions or making databases run faster than my coffee maker, 
                        I&apos;m probably tinkering with neural networks or convincing stubborn MacBooks to behave. 
                        Former tech whisperer turned software sorcerer, I speak multiple programming languages (and yes, human too!). 
                        With a CS degree from Grand View and a track record of making apps that actually work, 
                        I turn complex problems into elegant solutions – all while maintaining a sense of humor about the semicolons I occasionally forget.
                        </p>
                    </div>
                </div>

                {/* Right Column: Tabs */}
                <div className="col-span-1 text-left w-full">
                    <Tabs defaultValue="skills" className="w-full max-h-100">
                        <TabsList className="grid grid-cols-3 gap-2 sm:gap-4 pb-8 sm:pb-9">
                            <TabsTrigger value="skills" className="text-sm sm:text-base">Technical Skills</TabsTrigger>
                            <TabsTrigger value="tools" className="text-sm sm:text-base">Technologies</TabsTrigger>
                            <TabsTrigger value="education" className="text-sm sm:text-base">Education</TabsTrigger>
                        </TabsList>
                        <TabsContent value="skills">
                            <Card>
                                <CardHeader>
                                    <CardTitle>A List of My Technical Skills!</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {technicalSkills.map((item, index) => (
                                            <div key={index} className="mb-4">
                                                <p className="font-bold mb-2">{item.category}:</p>
                                                <ul className="list-disc list-inside text-gray-600 text-sm md:text-base pl-4 grid grid-cols-2 sm:grid-cols-3 gap-y-2">
                                                    {item.skills.map((skill, skillIndex) => (
                                                    <li key={skillIndex}>{skill}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                    ))}
                                    </div>
                                </CardContent>
                                <CardFooter></CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="tools">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Some Technologies That I&apos;ve Used</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {technologies.map((item, index) => (
                                            <div key={index} className="mb-4">
                                                <p className="font-bold mb-2">{item.category}:</p>
                                                <ul className="list-disc list-inside text-gray-600 text-sm md:text-base pl-4 grid grid-cols-2 sm:grid-cols-3 gap-y-2">
                                                    {item.skills.map((skill, skillIndex) => (
                                                    <li key={skillIndex}>{skill}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                    ))}
                                    </div>
                                </CardContent>
                                <CardFooter></CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="education">
                            <Card>
                                <CardHeader>
                                    <CardTitle>A Proud Grand View Viking...</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {/* Education Item 1 */}
                                        <div className="flex items-start gap-4">
                                            <Image
                                            src="/icons/grand-view-icon.svg"
                                            width={50}
                                            height={50}
                                            priority={false}
                                            alt="Grand View Icon"
                                            // className="invert dark:invert-0"
                                            />
                                            <div>
                                                <h3 className="text-lg font-bold">Grand View University</h3>
                                                <p className="italic text-sm text-gray-600">Bachelors in Computer Science, Minor in Mathematics</p>
                                                <p className="text-sm italic text-gray-600">2021-2023</p>
                                            </div>
                                        </div>

                                        {/* Education Item 2 */}
                                        <div className="flex items-start gap-4">
                                            <Image
                                            src="/icons/dmacc-icon.svg"
                                            width={50}
                                            height={50}
                                            priority={false}
                                            alt="DMACC Icon"
                                            // className="invert dark:invert-0"
                                            />
                                            <div>
                                                <h3 className="text-lg font-bold">Des Moines Area Community College</h3>
                                                <p className="italic text-sm text-gray-600">Associates in Liberal Arts</p>
                                                <p className="text-sm italic text-gray-600">2019-2021</p>
                                            </div>
                                        </div>
                                        </div>
                                </CardContent>
                                <CardFooter></CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>



      
    );
}