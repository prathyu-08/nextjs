import { client } from './client';
import { authApi } from './auth';
import { jobApi } from './jobs';
import { applicationApi } from './applications';
import { candidateApi } from './candidate';
import { resumeApi } from './resume';
import { skillsApi } from './skills';
import { jobDescriptionApi } from './jobDescription';
import { jobShareApi } from './jobShare';
import { notificationApi } from './notifications';
import { interviewApi, interviewerApi } from './interviews';
import { adminApi } from './admin';
import { jobApplicationFormsApi } from './jobApplicationForms';

export {
  client,
  authApi,
  jobApi,
  applicationApi,
  candidateApi,
  resumeApi,
  skillsApi,
  jobDescriptionApi,
  jobShareApi,
  notificationApi,
  interviewApi,
  interviewerApi,
  adminApi,
  jobApplicationFormsApi,
};

const api = {
  client,
  authApi,
  jobApi,
  applicationApi,
  candidateApi,
  resumeApi,
  skillsApi,
  jobDescriptionApi,
  jobShareApi,
  notificationApi,
  interviewApi,
  interviewerApi,
  adminApi,
  jobApplicationFormsApi,
};

export default api;
