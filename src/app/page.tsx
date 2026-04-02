import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
// import ParallaxGallery from "@/components/parallax-gallery";
import RadarChart from "@/components/radar-chart";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MapPin, Phone, Mail } from "lucide-react";

// const UI_REEL_IMAGES = [
//   { src: "/uireels/qik.webp", alt: "QIK Finance UI" },
//   { src: "/uireels/tms.webp", alt: "Transport Management System UI" },
//   { src: "/uireels/metfone.webp", alt: "Metfone UI" },
//   { src: "/uireels/trek.webp", alt: "Trek UI" },
//   { src: "/uireels/ins.webp", alt: "Insurance UI" },
//   { src: "/uireels/psp.webp", alt: "PSP UI" },
//   { src: "/uireels/ddv.webp", alt: "DDV UI" },
//   { src: "/uireels/mbs.webp", alt: "MBS UI" },
// ];

const BLUR_FADE_DELAY = 0.05;

export default function Page() {
  return (
    <main className="flex flex-col min-h-dvh space-y-10 items-center justify-center pb-8">
      <section id="hero" className="w-full bg-white/50 backdrop-blur-lg  rounded-[2.5rem] p-4 md:p-10" style={{ boxShadow: "0px 16px 40px 0 rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col md:flex-row gap-8 md:gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-8 bg-white/50 backdrop-blur-lg p-4 md:p-10 rounded-4xl" style={{ boxShadow: "0px 4px 24px 0 rgba(0,0,0,0.04)" }}>
            <div className="flex flex-col gap-6">
              <Avatar className="size-28 md:size-32">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1.5 pt-2">
                <h1 className="text-5xl md:text-5xl font-semibold tracking-[-3px] leading-tight text-brand-neutral-900">
                  {DATA.name}
                </h1>
                <div className="flex items-center gap-3 text-base md:text-sm font-base tracking-widest text-brand-neutral-600 uppercase leading-tight">
                  <span>{DATA.description}</span>
                </div>
              </div>
              <p className="text-brand-neutral-800  leading-tight text-base text-justify">
                {DATA.summary}
              </p>
            </div>

            <div className="space-y-4 pt-4 text-base text-brand-neutral-700 font-base">
              <div className="flex items-center gap-3">
                <MapPin className="size-5 text-brand-neutral-700" />
                <span>{DATA.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-5 text-brand-neutral-700" />
                <span>{DATA.contact.tel}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-brand-neutral-700" />
                <span>{DATA.contact.email}</span>
              </div>
            </div>

            <RadarChart skillsets={[...DATA.skillsets]} />
          </div>

          {/* Right Column */}
          <div className="flex-1 pt-4 md:pt-0 space-y-10">
            <div>
              <h2 className=" text-3xl font-medium text-brand-neutral-900 tracking-tighter mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.map((skill) => (
                  <div key={skill} className="bg-brand-neutral-200  text-brand-neutral-900  px-2 py-1.5 rounded-lg text-sm font-base ">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className=" text-3xl font-medium text-brand-neutral-900 tracking-tighter mb-6">Education</h2>
              <div className="flex flex-col gap-4">
                {DATA.education.map((education, id) => (
                  <BlurFade
                    key={education.school}
                    delay={BLUR_FADE_DELAY * 8 + id * 0.05}
                  >
                    <ResumeCard
                      key={education.school}
                      href={education.href}
                      logoUrl={education.logoUrl}
                      altText={education.school}
                      title={education.school}
                      subtitle={education.degree}
                      period={`${education.start} - ${education.end}`}
                    />
                  </BlurFade>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <h2 className=" text-3xl font-medium text-brand-neutral-900 tracking-tighter mb-6">Work Experience</h2>
              <div className="flex flex-col gap-4">
                {DATA.work.map((work, id) => (
                  <BlurFade
                    key={work.company + id}
                    delay={BLUR_FADE_DELAY * 6 + id * 0.05}
                  >
                    <ResumeCard
                      key={work.company + id}
                      logoUrl={work.logoUrl}
                      altText={work.company}
                      title={work.company}
                      subtitle={work.title}
                      href={work.href}
                      badges={work.badges}
                      period={`${work.start} - ${work.end ?? "Present"}`}
                      description={work.description}
                    />
                  </BlurFade>
                ))}

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* <section id="reel" className="mt-40">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-brand-neutral-800 text-brand-neutral-100 px-3 py-1 text-sm">
                  Gallery Reel
                </div>
                <h2 className="text-5xl md:text-5xl font-semibold tracking-[-3px] leading-tight text-brand-neutral-800">
                  UI Design Reel
                </h2>
                <p className="text-brand-neutral-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take a quick glance at a selection of my user interface works, showcasing my design skills and creativity.
                </p>
              </div>
            </div>
          </BlurFade>
          <ParallaxGallery images={UI_REEL_IMAGES} />
        </div>
      </section> */}


      <section id="projects" className="mt-40">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-brand-neutral-800 text-brand-neutral-100 px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-5xl md:text-5xl font-semibold tracking-[-3px] leading-tight text-brand-neutral-800">
                  My Highlight Projects
                </h2>
                <p className="text-brand-neutral-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on various projects throughout the years, here is the highlight reel of my best work.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  // video={project.video}
                  links={project.links}
                  target={project.active ? "_blank" : "_self"}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>


      <section id="hackathons" className="mt-20">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-brand-neutral-800 text-brand-neutral-100 px-3 py-1 text-sm">
                  Recognitions
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brand-neutral-800">
                  Honors and Awards
                </h2>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>


      <section id="contact" className="my-10">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-brand-neutral-800 text-brand-neutral-100 px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brand-neutral-800">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-brand-neutral-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me an email at{" "}
                <a
                  href="mailto:nkhanhvan293@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  nkhanhvan293@gmail.com
                </a>{" "}
                and I&apos;ll respond as soon as I can.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
