'use server';

import { utapi } from 'uploadthing/server';

export async function uploadFiles(fd: FormData) {
  const files = fd.getAll('files') as File[];
  const uploadedFiles = await utapi.uploadFiles(files);
  return uploadedFiles;
}
export async function uploadThumbnail(fd: FormData) {
  const files = fd.getAll('thumbnail') as File[];
  const uploadedThumbnail = await utapi.uploadFiles(files);
  return uploadedThumbnail;
}

export async function deleteFiles(oldImgKeys: any) {
  try {
    await utapi.deleteFiles(oldImgKeys);
  } catch (error: any) {
    throw new Error(`Failed to delete banner : ${error.message}`);
  }
}
export async function deleteManyFiles(keys: string[]) {
  try {
    await utapi.deleteFiles(keys);
  } catch (error: any) {
    throw new Error(`Failed to delete banner : ${error.message}`);
  }
}

export async function listFiles() {
  try {
    const files = await utapi.listFiles();
    return files;
  } catch (error: any) {
    throw new Error(`Failed to list files : ${error.message}`);
  }
}
