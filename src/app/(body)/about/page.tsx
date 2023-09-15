import { Typography } from '@/shared/Typography';
import { PageLayoutStatic } from '@/components/PageLayoutStatic';
import Image from 'next/image';

const { Heading, Text } = Typography;

export default function Page() {
  return (
    <PageLayoutStatic
      backHref="/"
      heading={
        <Heading
          level={5}
          kind="secondary"
          color="snow"
        >
          About me
        </Heading>
      }
    >
      <div className="grid grid-rows-[repeat(2,minmax(1rem,max-content))] gap-8 sm:gap-12 md:grid-cols-2 md:grid-rows-none md:gap-14 lg:gap-20">
        <div className="order-2 md:order-1">
          <p className="mb-4">
            <Text
              color="snow"
              size="sm"
            >
              I&apos;m Maxim Fadeev, a passionate photographer dedicated to capturing life&apos;s most beautiful moments through the lens of
              my camera. With a keen eye for detail and a love for creativity, I strive to create timeless images that resonate with
              emotions and memories.
            </Text>
          </p>

          <p className="mb-4">
            <Text
              color="snow"
              size="sm"
            >
              What sets me apart as a photographer is my dedication to understanding my subjects on a personal level. Whether it&apos;s a
              candid family portrait, a breathtaking landscape, or a vibrant urban scene, I believe that genuine connections and
              authenticity are at the heart of remarkable photography. Every photo I take tells a unique tale, and I&apos;m committed to
              going the extra mile to ensure that each image encapsulates the true essence of the moment.
            </Text>
          </p>

          <p className="mb-4">
            <Text
              color="snow"
              size="sm"
            >
              When I&apos;m not behind the camera, you can find me [mention a couple of personal interests or hobbies to give visitors a
              glimpse of your personality outside of photography]. I believe that life&apos;s small pleasures fuel my creativity and enable
              me to bring a unique perspective to every project I undertake.
            </Text>
          </p>

          <p className="mb-4">
            <Text
              color="snow"
              size="sm"
            >
              Let&apos;s embark on a visual journey together and create memories that will last a lifetime.
            </Text>
          </p>
        </div>

        <Image
          priority
          src="/images/avatar.png"
          width={700}
          height={700}
          alt="avatar"
          className="order-1 aspect-square rounded-xl object-cover md:order-2 md:h-full"
        />
      </div>
    </PageLayoutStatic>
  );
}
