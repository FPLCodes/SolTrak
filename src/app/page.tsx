"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ArrowRight, BarChart2, Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to SolTrak
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Manage your Solana assets with ease. Track, analyze, and
                  optimize your portfolio in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  <Link href="/your-wallet">Get Started</Link>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose SolTrak?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <BarChart2 className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Get in-depth insights into your Solana portfolio with our
                    advanced analytics tools.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>Secure Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Manage your assets securely with our state-of-the-art
                    encryption and security measures.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>Real-time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Stay up-to-date with real-time price updates and portfolio
                    valuation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                <p>
                  Securely connect your Solana wallet to SolTrak with just a few
                  clicks.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">View Your Assets</h3>
                <p>
                  Get a comprehensive overview of all your Solana tokens and
                  NFTs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Analyze and Optimize</h3>
                <p>
                  Use our tools to analyze your portfolio and make informed
                  decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Amazing Tool!</CardTitle>
                  <CardDescription>John D., Solana Enthusiast</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    &quot;SolTrak has revolutionized how I manage my Solana
                    assets. The insights are invaluable!&quot;
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User-Friendly and Powerful</CardTitle>
                  <CardDescription>Sarah M., Crypto Investor</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    &quot;I love how easy it is to use SolTrak. It&apos;s both
                    powerful and intuitive - perfect for beginners and pros
                    alike.&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Is SolTrak free to use?</AccordionTrigger>
                <AccordionContent>
                  Yes, SolTrak offers a free tier with basic features. We also
                  have premium plans for advanced users.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How secure is SolTrak?</AccordionTrigger>
                <AccordionContent>
                  We use industry-standard encryption and security measures to
                  ensure your data and assets are protected.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Can I use SolTrak on mobile?
                </AccordionTrigger>
                <AccordionContent>
                  SolTrak is fully responsive and works great on mobile devices
                  and tablets.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Take Control of Your Solana Assets?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Join thousands of users who are already benefiting from
                  SolTrak&apos;s powerful features.
                </p>
              </div>
              <div className="space-x-4">
                <WalletMultiButton className="wallet-adapter-button" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex gap-4 text-sm">
              <a className="underline">About</a>
              <a className="underline">Privacy Policy</a>
              <a className="underline">Terms of Service</a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 SolTrak. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
