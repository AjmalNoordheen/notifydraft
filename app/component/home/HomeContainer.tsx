"use client";
import React from "react";
import { Button } from "../elements/Button";
import { ClockIcon } from "../icons/ClockIcon";
import { BellIcon } from "../icons/BellIcon";
import { ShieldIcon } from "../icons/ShielIcon";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HomeContainer = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="flex h-16 items-center justify-between py-4 px-8">
          <div className="flex items-center relative">
            <Image
              src="/notiLogo.png"
              alt="DocuTrack Logo"
              width={180}
              height={80}
            />
            <span className="text-lg font-semibold absolute -right-7 text-foreground">
              DocuTrack
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => router.push("/login")}
              text="Sign In"
              className="w-fit bg-white text-sm p-2"
            />
            <Button
              onClick={() => router.push("/login")}
              className=" w-fit text-sm  p-2"
              variant="primary"
              text="Get Started"
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm text-purple-700">
            <span>For UAE Typing Centers</span>
          </div>
          <div className="text-4xl font-bold tracking-tight sm:text-5xl z-10">
            Never Miss a Document
            <br />
            <div className="relative inline-block text-6xl font-extrabold px-4.5 py-1.5">
              <span className="absolute inset-1 text-slate-400 [-webkit-text-stroke:1px_black]">
                Expiry Date Again
              </span>
              <span className="relative bg-[url('/natur.jfif')] bg-cover animate-text-bg bg-clip-text text-transparent">
                Expiry Date Again
              </span>
            </div>{" "}
          </div>
          <p className="text-lg text-muted-foreground">
            DocuTrack helps UAE typing centers track visa, Emirates ID, trade
            license, and passport expiry dates. Get automated reminders and keep
            your customers informed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => router.push("/login")}
              className="w-fit text-lg px-4 py-2"
              text="Start Free Trial  &nbsp;➜"
              variant="primary"
            />

            <Button
              onClick={() => router.push("/login")}
              className="w-fit text-lg px-4 py-2"
              variant="secondary"
              text="Sign In"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 lg:py-24 border-t border-border  bg-slate-50/20 ">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground">
            Everything You Need
          </h2>
          <p className="text-muted-foreground mt-2">
            Simple, powerful tools for document management
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-12 lg:px-20 xl:px-28">
          <FeatureCard
            icon={
              <div
                className={`inline-flex items-center justify-center h-12 w-12 rounded-xl`}
              >
                <div
                  className={`h-12 w-12 rounded-xl bg-blue-50 border border-slate-200 text-blue-700 flex items-center justify-center`}
                >
                  <ClockIcon className="h-6 w-6" />
                </div>
              </div>
            }
            title="Expiry Tracking"
            description="Track all document types - Visa, Emirates ID, Trade License, Passport, and more."
          />
          <FeatureCard
            icon={
              <div
                className={`inline-flex items-center justify-center h-12 w-12 rounded-xl`}
              >
                <div
                  className={`h-12 w-12 rounded-xl bg-blue-50 border border-slate-200 text-blue-700 flex items-center justify-center`}
                >
                  <BellIcon className="h-6 w-6" />
                </div>
              </div>
            }
            title="Automated Reminders"
            description="Get email and WhatsApp notifications at 60, 30, and 15 days before expiry."
          />
          <FeatureCard
            icon={
              <div
                className={`inline-flex items-center justify-center h-12 w-12 rounded-xl`}
              >
                <div
                  className={`h-12 w-12 rounded-xl bg-blue-50 border border-slate-200 text-blue-700 flex items-center justify-center`}
                >
                  <ShieldIcon className="h-6 w-6" />
                </div>
              </div>
            }
            title="Secure Storage"
            description="Upload and store document copies securely. Access them anytime, anywhere."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 lg:py-24 px-12 lg:px-20 xl:px-28">
        <div className="rounded-2xl [background-image:var(--ring-gradient)] p-12 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="text-slate-300 mt-2 mb-8">
            Join typing centers across UAE using DocuTrack to manage their
            documents.
          </p>
          <Button
            onClick={() => router.push("/login")}
            className="w-fit font-medium text-sm px-5 py-3"
            variant="secondary"
            text="Create Your Account &nbsp;➜"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DocuTrack. Built for UAE Typing Centers.
        </div>
      </footer>
    </div>
  );
};

export default HomeContainer;

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-white p-6">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground mt-2">{description}</p>
    </div>
  );
}
