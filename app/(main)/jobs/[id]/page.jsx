import JobDetailPage from '../../../../components/jobs/JobDetailPage';

export async function generateMetadata({ params }) {
  return {
    title: `Job ${params.id}`,
    description: 'View job details, requirements, and apply directly to this position.',
  };
}

export default function Page({ params }) {
  return <JobDetailPage jobId={params.id} />;
}
