import { Steps } from '@/components/Steps'
import { DocumentationLayout } from '@/layouts/DocumentationLayout'
import { InstallationLayout } from '@/layouts/InstallationLayout'
import Link from 'next/link'
import Code  from '@/components/docs/Code'

let steps = [
  {
    title: 'Configure API server address in UI',
    body: () => (
      <>
        <p>
           Because our UI static files and api server are deployed in different hosts, so we need to configure the API server address for UI to access.
        </p>
        <p>let's assume your xobserve server( which is also API server ) is running at <Code> http://10.7.10.10 </Code>, you can also use a domain name here, such as `https://api.xobserve.io`</p>

        <p>
            Find the `.env` file under `ui` directory, and modify it's content to :
        </p>
      </>
    ),
    code: {
      name: 'SourceCodeRoot/ui/.env',
      lang: 'env',
      code: `VITE_API_SERVER_PROD=http://10.7.10.10 `,
    },
  },
  {
    title: 'Build the release files',
    body: () => (
      <p>
            Now, we can build the release files by calling `release.sh` in the root directory of xObserve source code
      </p>
    ),
    code: {
      name: 'SourceCodeRoot',
      lang: 'terminal',
      code: `./release.sh`
    },
  },
  {
    title: 'Release directory',
    body: () => (
      <>
        <p>
          When building release files is done, you should see a `release` directory in the root of xobserve source code.
        </p>
        <p> There are three `.zip` files in `release` directory, unzip the one you need( let's assume you are using linux for hosting), you should see below files that we need to deploy xobserve:</p>
        <p>
            1. <Code>xobserve</Code>: Binary file for starting xobserve server (api server)
        </p>
        <p>
            2. <Code>xobserve.yaml</Code>: Config file for xobserve server
        </p>
        <p>
            3. <Code>xobserve.sql</Code>: Sql source for Mysql database
        </p>
        <p>
            4. <Code>ui directory</Code>: UI static files, you can deploy this to nginx or Github pages.
        </p>
      </>
    ),
    code: {
      name: 'SourceCodeRoot/release/linux',
      lang: 'terminal',
      code: `linux % ls
xobserve		xobserve.sql	xobserve.yaml	ui`,
    },
  },
  {
    title: 'Deploy xobserve api server',
    body: () => (
      <>
        <p>
           Copy `xobserve` binary file and `xobserve.yaml` to the server with ip `10.7.10.10` , modify the `xobserve.yaml` and start xobserve server: `./xobserve --config xobserve.yaml`
        </p>
      </>
    ),
    code: {
      name: '10.7.10.10/xobserve.yaml',
      lang: 'terminal',
      code: `server:
    ## xobserve server address
    addr: "10.7.10.10:80"`
    },
  },
  {
    title: 'Deploy UI',
    body: () => (
      <p>
         Now you can deploy `ui` directory to `Nginx`, let's assume the IP of `nginx` server is `http://10.7.10.11`
      </p>
    ),
    code: {
        name: '10.7.10.11/nginx',
        lang: 'terminal',
        code: `Deploy static files in release/ui directory  to nginx`
      },
  },
]

export default function Index({ code }) {
  return (
    <InstallationLayout>
      <div
        id="content-wrapper"
        className="relative z-10 max-w-3xl mb-16 prose prose-slate dark:prose-dark"
      >
        <h3 className="sr-only">Installing xObserve</h3>
        <p>
          In this sectionl, we will deploy our UI static files and api server in different hosts.  First, let's download the <strong>`source code`</strong> of xObserve from  <Link href="https://github.com/xobserveio/xobserve/releases">Github</Link>, and prepared two servers for hosting xobserve: 
        </p>
        <p>1. <strong>10.7.10.10</strong> for hosting xobserve server( api server )</p>
        <p>2. <strong>10.7.10.11</strong> for hosting UI static files ( through nginx )</p>
      </div>
      <Steps level={4} steps={steps} code={code} />
      
      <div>
      <h2 className="text-slate-900 text-xl tracking-tight font-bold mb-3 dark:text-slate-200">
          Try xObserve in browser
        </h2>
        <p>It's more complex than the previous installation sections, but if your are familar with web deployment, you should not feel hard in this process :)  Now let's can open Chrome or Safari browser and visit <Code><Link href="http://10.7.10.11">http://10.7.10.11</Link></Code> to access our xObserve UI which is deployed on nginx server.</p>
        <p className="mt-4">If you open the inspector of Chrome, you will see all of the xobserve requests are requesting to our api server -  http://10.7.10.10</p>
      </div>
      {/*
        <Cta
          label="Read the documentation"
          href="/docs/tailwind-cli"
          description={
            <>
              <strong className="font-semibold text-slate-900">
                This is only the beginning of what’s possible with the Tailwind CLI.
              </strong>{' '}
              To learn more about everything it can do, check out the Tailwind CLI documentation.
            </>
          }
        />
      */}
    </InstallationLayout>
  )
}

export function getStaticProps() {
  let { highlightedCodeSnippets } = require('@/components/Guides/Snippets.js')

  return {
    props: {
      code: highlightedCodeSnippets(steps),
    },
  }
}

Index.layoutProps = {
    meta: {
      title: 'Deploy from source',
      description:
        '',
      section: 'Getting Started',
    },
    Layout: DocumentationLayout,
    allowOverflow: false,
  }