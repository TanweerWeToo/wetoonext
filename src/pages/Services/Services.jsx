import { ServicesGrid } from "@/pages/Services/services-grid"

export default function Services() {
  return (
    <div className="bg-background pt-[48px] text-foreground min-h-screen antialiased">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-l from-foreground to-muted-foreground/80">
            WETOO MEDIA SERVICES
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Your one-stop solution for UPSC CSE coaching support, digital presence, and educational infrastructure.
          </p>
        </div>
        <ServicesGrid />
      </main>
      {/* <footer className="text-center py-8 border-t border-white/5">
        <p className="text-muted-foreground">&copy; {new Date().getFullYear()} WETOO MEDIA. All rights reserved.</p>
      </footer> */}
    </div>
  )
}
