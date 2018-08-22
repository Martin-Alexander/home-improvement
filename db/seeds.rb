project_places = [
  "Basement",
  "Villa",
  "Porch",
  "Backyard",
  "Front Yard",
  "Swimming Pool",
  "Kitchen",
  "Living Room"
]

project_types = [
  "Renovation",
  "Refurbish",
  "Construction"
]

print "Clearing users & projects... "

User.destroy_all # Destroys all projects as well

puts "Done"

print "Clearing comments & likes... "

Comment.destroy_all # Destroys all likes & replies as well

puts "Done"

print "Seeding users... "

20.times do 
  name = Faker::Seinfeld.character

  User.create({
    email: name.chars.join("").downcase.gsub(" ", "") + "@gmail.com",
    first_name: name.split(" ")[0],
    last_name: name.split(" ")[1],
    password: "123456"
  }) 
end

puts "Done"

print "Seeding prjects... "

20.times do
  status = Project::Statuses.sample
  Project.create!({
    user: User.all.sample,
    name: project_places.sample + " " + project_types.sample,
    description: Faker::Lorem.paragraphs(3).join(" "),
    private: Faker::Boolean.boolean(0.2),
    estimated_level_of_effort: rand(1..10),
    actual_level_of_effort: status == "completed" ? rand(1..10) : nil,
    status: status
  })  
end

puts "Done"

print "Seeding comments... "

Comment.create!({
  user: User.all.sample,
  project: Project.all.sample,
  content: Faker::Seinfeld.quote
})

200.times do
  project = Project.where(private: false).sample
  if rand > 0.5 && Comment.where(project: project).any?
    parent = Comment.where(project: project).sample
  else
    parent = nil
  end
  Comment.create!({
    user: User.all.sample,
    project: project,
    content: [Faker::Seinfeld.quote, Faker::HarryPotter.quote].sample,
    parent: parent
  })
end

puts "Done"

print "Seeding likes... "

500.times do
  Like.create({
    user: User.all.sample,
    comment: Comment.all.sample
  })
end

puts "Done"