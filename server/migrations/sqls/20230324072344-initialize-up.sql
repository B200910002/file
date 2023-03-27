CREATE TABLE IF NOT EXISTS public.users
(
    _id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    verify boolean NOT NULL default false,
    CONSTRAINT user_pkey PRIMARY KEY (_id)
);	

CREATE TABLE IF NOT EXISTS public.categories
(
    _id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (_id)
);

CREATE TABLE IF NOT EXISTS public.extentions
(
    _id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    category_id integer NOT NULL,
    CONSTRAINT extentions_pkey PRIMARY KEY (_id),
	foreign key (category_id) references categories(_id)
);

CREATE TABLE IF NOT EXISTS public.files
(
    _id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    extention_id integer NOT NULL,
	owner_id integer not null,
    CONSTRAINT files_pkey PRIMARY KEY (_id),
	foreign key (extention_id) references extentions(_id),
	foreign key (owner_id) references users(_id)
);

insert into categories values 
	(default, 'audio', 'The Audio Files category includes compressed and uncompressed audio formats, which contain waveform data that can be played with audio playback software. This category also includes MIDI files, musical scores, and audio project files, which typically do not contain audio data.'),
	(default, 'compressed', 'Compressed files use file compression in order to save disk space. Compressed archive formats can also be used to compress multiple files into a single archive. Several open and proprietary compression algorithms can be used to compress files, which is why many different compressed file types exist.'),
	(default, 'data', 'Data files are the most common type of computer files. They may be installed with applications or created by users. Most data files are saved in a binary format, though some store data as plain text. Examples of data files include libraries, project files, and saved documents.'),
	(default, 'database', 'Database files store data in a structured format, organized into tables and fields. Individual entries within a database are called records. Databases are commonly used for storing data referenced by dynamic websites.'),
	(default, 'develop', 'The Developer Files category contains files related to software development. These include programming project files, source code files, code libraries, header files, and class files. Compiled objects and components are also included in this category.'),
	(default, 'font', 'Font files contain one or more fonts that can be accessed by the operating system and applications. Most modern fonts are stored in either the OpenType or TrueType formats, which can be used by both Macintosh and Windows computers.'),
	(default, 'game', 'The Game Files category includes saved video game files and files referenced by video games. It also includes game ROMs, which are software copies of games developed for other systems, such as Super Nintendo and Nintendo 64. These files can be played using a software emulator.'),
	(default, 'misc', 'The Misc Files category contains miscellaneous file types that do not fit within other categories. Some examples are partially downloaded files, installer files, and renamed files. This category may also include files related to other hardware devices besides computers.'),
	(default, 'pagelayout', 'Page layout files are documents that may contain both text and image data. They also include formatting information, which defines the page size, margins, and how content is organized on the page. Page layout documents are often used for creating printable publications, such as newspapers, magazines, and brochures.'),
	(default, 'raster', 'Raster graphics are the most common type of image files. They are comprised of a grid of pixels where each pixel represents an individual color within the image. Both Web graphics and digital photos are stored as raster graphics. While some raster image formats are uncompressed, most use some type of image compression.'),
	(default, 'settings', '"Settings files store settings for the operating system and applications. These files are not meant to be opened by the user, but are modified by the corresponding application when the program preferences are changed. Settings files may also be called preference files or configuraton files.'),
	(default, 'system', 'The System Files category includes files related to Mac, Windows, and Linux operating systems. Some examples include system libraries, icons, themes, and device drivers. Files output by the system are also included in this category.'),
	(default, 'text', 'Text files contain textual data and may be saved in plain text or rich text formats. While most text files are documents created and saved by users, they can also be used by software developers to store program data. Examples of text files include word processing documents, log files, and saved email messages.'),
	(default, 'video', 'The Video Files category includes a wide range of video formats, which use different codecs to encode and compress video data. This category also includes video project files and video information files, which may not contain video data.'),
	(default, 'web', 'The Web Files category includes files related to websites and Web servers. These include static and dynamic webpages, Web applications, and files referenced by webpages. Files generated by Web development software are also included in this category.');

insert into extentions values
	(default, 'm3u', 'M3U Media Playlist', 1),
	(default, 'mid', 'MIDI File', 1),
	(default, 'mp3', 'MP3 Audio File', 1),
	(default, 'ogg', 'Ogg Vorbis Audio File', 1),
	(default, 'wav', 'WAVE Audio File', 1),
	(default, 'rar', 'WinRAR Compressed Archive', 2),
	(default, 'vip', 'Virtual Instrument Package', 2),
	(default, 'zip', 'Zipped File', 2),
	(default, 'zipx', 'Extended Zip Archive', 2),
	(default, 'bin', 'Generic Binary File', 3),
	(default, 'csv', 'Comma-Separated Values File', 3),
	(default, 'dat', 'Data File', 3),
	(default, 'key', 'Software License Key File', 3),
	(default, 'ppt', 'Microsoft PowerPoint Presentation (Legacy)', 3),
	(default, 'pptx', 'Microsoft PowerPoint Presentation', 3),
	(default, 'xml', 'XML File', 3),
	(default, 'db', 'Mobile Device Database', 4),
	(default, 'sql', 'Structured Query Language Data File', 4),
	(default, 'sqlite', 'SQLite Database', 4),
	(default, 'bat', 'DOS Batch File', 5),
	(default, 'c', 'C/C++ Source Code File', 5),
	(default, 'config', 'Configuration File', 5),
	(default, 'cpp', 'C++ Source Code File', 5),
	(default, 'java', 'Java Source Code File', 5),
	(default, 'py', 'Python Script', 5),
	(default, 'yml', 'YAML Document', 5),
	(default, 'pdf', 'Portable Document Format File', 9),
	(default, 'pdo', 'Pepakura Designer File', 9),
	(default, 'bmp', 'Bitmap Image', 10),
	(default, 'dcm', 'DICOM Image',10 ),
	(default, 'gif', 'Graphical Interchange Format File', 10),
	(default, 'jpg', 'JPEG Image', 10),
	(default, 'png', 'Portable Network Graphic', 10),
	(default, 'ddl', 'Data Definition Language File', 12),
	(default, 'sys', 'Windows System File', 12),
	(default, 'doc', 'Microsoft Word Document (Legacy)', 13),
	(default, 'docx', 'Microsoft Word Document', 13),
	(default, 'eml', 'E-Mail Message', 13),
	(default, 'log', 'Log File', 13),
	(default, 'msg', 'Outlook Message Item File', 13),
	(default, 'odt', 'OpenDocument Text Document', 13),
	(default, 'rtf', 'Rich Text Format File', 13),
	(default, 'tex', 'LaTeX Source Document', 13),
	(default, 'txt', 'Plain Text File', 13),
	(default, 'wpd', 'WordPerfect Document', 13),
	(default, 'amc', 'AMC Video File', 14),
	(default, 'mov', 'Apple QuickTime Movie', 14),
	(default, 'mp4', 'MPEG-4 Video', 14),
	(default, 'mpg', 'MPEG Video', 14),
	(default, 'str', 'dBASE Structure List Object File', 14),
	(default, 'swf', 'Shockwave Flash Movie', 14),
	(default, 'webm', 'WebM Video', 14),
	(default, 'css', 'Cascading Style Sheet',15 ),
	(default, 'html', 'Hypertext Markup Language File', 15),
	(default, 'js', 'JavaScript File', 15),
	(default, 'json', 'JavaScript Object Notation File',15 ),
	(default, 'php', 'PHP Source Code File', 15);