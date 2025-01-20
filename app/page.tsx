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


export default function Home() {
  return (
    <>
    <main>
      
    </main>
      <section id="connect">
        <Card>
          <CardHeader className="flex justify-center text-center">
            <CardTitle>Lets connect and learn more about each other!</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex space-x-4 w-full">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="ex. John" className="w-full" />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="ex. Doe" className="w-full" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="ex. john.doe@example.com" className="w-full" />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Send it!</Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}