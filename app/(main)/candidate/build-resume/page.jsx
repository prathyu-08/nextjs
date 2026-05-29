'use client';
import dynamicImport from 'next/dynamic';


// Dynamic import to avoid SSR issues with localStorage
const EditProfileResumeBuilder = dynamicImport(
  () => import('../../../../components/resume-builder/EditProfileResumeBuilder'),
  { ssr: false }
);

export default function BuildResumePage() {
  return <EditProfileResumeBuilder />;
}
