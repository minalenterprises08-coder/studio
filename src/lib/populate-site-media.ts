// IMPORTANT: This script should be run once to populate the initial data.
// You can run this from a temporary component or a script execution environment.
// Example: `npx ts-node -r tsconfig-paths/register src/lib/populate-site-media.ts`

import { initializeFirebase } from '../firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { PlaceHolderImages } from './placeholder-images';

async function populateSiteMedia() {
  console.log('Initializing Firebase...');
  const { firestore } = initializeFirebase();
  const siteMediaCollection = collection(firestore, 'site_media');

  console.log('Checking if site_media collection is empty...');
  const snapshot = await getDocs(siteMediaCollection);
  if (!snapshot.empty) {
    console.log('site_media collection is not empty. Aborting population.');
    return;
  }
  
  console.log('Populating site_media collection...');

  const mediaToPopulate = [
    {
      id: 'hero-background',
      name: 'Hero Background',
      description: 'The main background image for the homepage hero section.',
      imageUrl: "https://images.unsplash.com/photo-1759563874670-9ccc048192ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxsdXh1cnklMjBwYWNrYWdpbmd8ZW58MHx8fHwxNzYyMTc2NjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 'about-page-team',
      name: 'About Page Team Image',
      description: 'Image of the team working in the print shop on the About Us page.',
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwcmludGluZyUyMHByZXNzfGVufDB8fHx8MTc2MjE3NjY0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 'production-capability',
      name: 'Production Capability Image',
      description: 'Image of industrial machinery on the homepage.',
      imageUrl: 'https://images.unsplash.com/photo-1563784152347-9a09325a472a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxpbmR1c3RyaWFsJTIwbWFjaGluZXJ5fGVufDB8fHx8MTc2MjI5MDYyNnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
     {
      id: 'fsc-certificate',
      name: 'FSC Certificate',
      description: 'The FSC Chain of Custody certificate image.',
      imageUrl: 'https://storage.googleapis.com/stedi-studio-assets-public/cert-min.jpg'
    },
  ];

  for (const media of mediaToPopulate) {
    try {
      const docRef = doc(firestore, 'site_media', media.id);
      await setDoc(docRef, media);
      console.log(`Successfully populated document: ${media.id}`);
    } catch (error) {
      console.error(`Failed to populate document: ${media.id}`, error);
    }
  }

  console.log('Population complete.');
}

// To run this script, you might need to execute it in a Node.js environment
// that has access to your Firebase credentials.
// For example, in a temporary Next.js API route or a standalone script.
// populateSiteMedia().catch(console.error);

    