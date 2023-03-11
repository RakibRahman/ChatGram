import React from 'react';

interface SocialLinksProp {
    socialLinks:
        | {
              fb?: string;
              linkedin?: string;
              twitter?: string;
          }
        | undefined;
}
const socialIcons = {
    fb: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-app-icon.png',
    linkedIn:
        'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-app-icon.png',
    twitter:
        'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/twitter-app-icon.png',
};

const LinkPreview = ({ link, icon }: { link: string; icon: string }) => {
    return (
        <>
            <a href={link} className="link" target="_blank">
                <img
                    src={icon}
                    alt="social link"
                    className="w-8 h-8 object-cover rounded-md hover:opacity-50"
                />
            </a>
        </>
    );
};

export const SocialLinks: React.FC<SocialLinksProp> = ({ socialLinks }) => {
    if (!socialLinks) return null;

    return (
        <div className="flex gap-2 items-center">
            {socialLinks.fb ? (
                <LinkPreview link={socialLinks?.fb} icon={socialIcons['fb']} />
            ) : null}
            {socialLinks.linkedin ? (
                <LinkPreview link={socialLinks?.linkedin} icon={socialIcons['linkedIn']} />
            ) : null}
            {socialLinks.twitter ? (
                <LinkPreview link={socialLinks?.twitter} icon={socialIcons['twitter']} />
            ) : null}
        </div>
    );
};
