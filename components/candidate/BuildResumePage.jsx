'use client';
import { Shell } from "./_shared";
import EditProfileResumeBuilder from "../resume-builder/EditProfileResumeBuilder";

export default function BuildResumePage() {
  return (
    <Shell path="/candidate/build-resume" title="Build Resume" subtitle="Create a professional resume that stands out to employers">
      <EditProfileResumeBuilder />
    </Shell>
  );
}
