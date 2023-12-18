import React, { useEffect, useState } from 'react';
import contentful from 'contentful';
import { createClient } from 'contentful' 
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

const SinglePost = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntry('3ggxNpp7Dh8vvQzd9D2mqo')
        console.log(response)
        setPost(response);
      } catch (error) {
        console.error('Error fetching content:', error.message);
      }
    };
    
    fetchData();
  }, []);

  const images = {
    renderNode: {
      'embedded-asset-block': node => (
        <img
          src={node.data.target.fields.file.url}
          alt={node.data.target.fields.description}
        />
      ),
    },
  };

  return (
    <div>
      <h2>Contentful Post</h2>
      {post && (
        <div>
          <h3>{post.fields.title}</h3>
          <p>by {post.fields.author.fields.authorName}</p>
          <p>{post.sys.createdAt}</p>
          <p>{post.metadata.tags[0].sys.id}</p>
          {/* Display other fields based on your content model */}
          {documentToReactComponents(post.fields.mainBody, images)}
        </div>
      )}
    </div>
  );
};

export default SinglePost;

