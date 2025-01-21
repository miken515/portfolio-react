import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function About() {
    return (
        <section className="px-5 py-8 sm:py-12" id="about">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Left Column: Fun Facts */}
                <div className="col-span-1 text-center sm:text-left">
                    <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                        <h2 className="text-4xl font-bold mb-4">Fun Facts!</h2>
                        <p className="text-stone-500 text-base sm:text-lg">
                        Cats cannot taste sweetness. Full-stack developer by day, bug slayer by night! 
                        When I'm not architecting Docker solutions or making databases run faster than my coffee maker, 
                        I'm probably tinkering with neural networks or convincing stubborn MacBooks to behave. 
                        Former tech whisperer turned software sorcerer, I speak multiple programming languages (and yes, human too!). 
                        With a CS degree from Grand View and a track record of making apps that actually work, 
                        I turn complex problems into elegant solutions – all while maintaining a sense of humor about the semicolons I occasionally forget.
                        </p>
                    </div>
                </div>

                {/* Right Column: Tabs */}
                <div className="col-span-1 text-center sm:text-left w-full">
                    <Tabs defaultValue="skills" className="w-full">
                        <TabsList className="grid grid-cols-3 gap-2 sm:gap-4">
                        <TabsTrigger value="skills" className="text-sm sm:text-base">Technical Skills</TabsTrigger>
                        <TabsTrigger value="tools" className="text-sm sm:text-base">Technologies</TabsTrigger>
                        <TabsTrigger value="education" className="text-sm sm:text-base">Education</TabsTrigger>
                        </TabsList>
                        <TabsContent value="skills">
                        <p>Technical Skills content goes here...</p>
                        </TabsContent>
                        <TabsContent value="tools">
                        <p>Technologies content goes here...</p>
                        </TabsContent>
                        <TabsContent value="education">
                        <p>Education content goes here...</p>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>



      
    );
}