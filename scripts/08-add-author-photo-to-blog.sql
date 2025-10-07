-- Add author_photo column to blog_posts table
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS author_photo TEXT;

-- Update existing posts with a default author photo
UPDATE blog_posts
SET author_photo = '/placeholder.svg?height=40&width=40'
WHERE author_photo IS NULL;

-- Add comment
COMMENT ON COLUMN blog_posts.author_photo IS 'URL of the author profile photo';
