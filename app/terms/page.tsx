import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-16">
                <Badge className="mb-4">Legal</Badge>
                <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
                <p className="mt-4 text-lg text-muted-foreground">Last updated: September 26, 2025</p>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Acceptance of Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      By accessing or using Waypoint, you agree to be bound by these Terms of Service and our Privacy
                      Policy. If you do not agree to these terms, please do not use our service.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Eligibility</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">To use Waypoint, you must:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Be at least 18 years old</li>
                      <li>• Provide accurate and complete information</li>
                      <li>• Verify your identity with government-issued ID</li>
                      <li>• Comply with all applicable laws and regulations</li>
                      <li>• Not be prohibited from using our service under applicable law</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Conduct</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">You agree not to:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Harass, abuse, or harm other users</li>
                      <li>• Provide false or misleading information</li>
                      <li>• Use the service for illegal activities</li>
                      <li>• Attempt to circumvent safety measures</li>
                      <li>• Share inappropriate content</li>
                      <li>• Violate others' privacy or intellectual property</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Safety and Responsibility</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      While we implement safety measures, you are responsible for your own safety. Always meet in public
                      places, inform trusted contacts of your plans, and trust your instincts.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We reserve the right to suspend or terminate accounts that violate our community guidelines or
                      pose a safety risk to other users.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Limitation of Liability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Waypoint provides a platform for social connections but cannot guarantee the behavior of other
                      users. We are not liable for any damages arising from your use of the service or interactions with
                      other users, except as required by law.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Changes to Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      We may update these terms from time to time. We will notify you of significant changes via email
                      or app notification. Continued use of the service after changes constitutes acceptance of the new
                      terms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      For questions about these terms, contact us at:
                      <br />
                      Email: legal@waypoint.app
                      <br />
                      Address: [Company Address]
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
