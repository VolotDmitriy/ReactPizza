import * as React from 'react';
import ContentLoader from 'react-content-loader';

type SkeletonProps = React.ComponentProps<typeof ContentLoader>;

const Skeleton = (props: SkeletonProps) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="140" cy="126" r="120" />
        <rect x="0" y="266" rx="10" ry="10" width="280" height="28" />
        <rect x="0" y="314" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="428" rx="10" ry="10" width="100" height="30" />
        <rect x="125" y="420" rx="24" ry="24" width="152" height="45" />
    </ContentLoader>
);

export default Skeleton;
